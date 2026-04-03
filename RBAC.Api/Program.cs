using System.Text;
using BCrypt.Net;
using Carter;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RBAC.Api.Common.Behaviours;
using RBAC.Api.Domain.Entities;
using RBAC.Api.Features.Auth;
using RBAC.Api.Infrastructure.BackgroundServices;
using RBAC.Api.Infrastructure.Middleware;
using RBAC.Api.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=rbac.db"));

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

var jwtSettings = new JwtSettings();
builder.Configuration.GetSection("JwtSettings").Bind(jwtSettings);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Requester", policy => policy.RequireRole("Requester"));
    options.AddPolicy("HOD", policy => policy.RequireRole("HOD"));
    options.AddPolicy("IT", policy => policy.RequireRole("IT"));
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(LoginHandler).Assembly));
builder.Services.AddValidatorsFromAssemblyContaining<LoginValidator>();

builder.Services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
builder.Services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehaviour<,>));

builder.Services.AddHttpContextAccessor();
builder.Services.AddCarter();

builder.Services.AddHostedService<AccessExpiryBackgroundService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "RBAC API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer"
    });
    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Seed initial data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.EmpMast.Any())
    {
        db.EmpMast.AddRange(new[]
        {
            new EmpMast
            {
                EmpId = "EMP001",
                EmpName = "John Doe",
                Email = "john.doe@company.com",
                Username = "johndoe",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                Department = "IT",
                Designation = "Developer",
                Role = "IT",
                IsActive = true
            },
            new EmpMast
            {
                EmpId = "EMP002",
                EmpName = "Jane Smith",
                Email = "jane.smith@company.com",
                Username = "janesmith",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                Department = "HR",
                Designation = "Manager",
                Role = "HOD",
                IsActive = true
            },
            new EmpMast
            {
                EmpId = "EMP003",
                EmpName = "Alice Johnson",
                Email = "alice.johnson@company.com",
                Username = "alicej",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                Department = "Finance",
                Designation = "Requester",
                Role = "Requester",
                IsActive = true
            }
        });
        db.SaveChanges();
    }
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapCarter();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.Run();