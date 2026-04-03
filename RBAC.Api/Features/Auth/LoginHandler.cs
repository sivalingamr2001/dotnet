using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RBAC.Api.Common.Responses;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.Auth;

public class LoginHandler : IRequestHandler<LoginCommand, ApiResponse<LoginResult>>
{
    private readonly AppDbContext _db;
    private readonly JwtSettings _settings;

    public LoginHandler(AppDbContext db, IOptions<JwtSettings> settings)
    {
        _db = db;
        _settings = settings.Value;
    }

    public async Task<ApiResponse<LoginResult>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _db.EmpMast
            .FirstOrDefaultAsync(x => (x.Username == request.UsernameOrEmail || x.Email == request.UsernameOrEmail) && x.IsActive, cancellationToken);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return ApiResponse<LoginResult>.Fail("Invalid credentials");

        var claims = new List<Claim>
        {
            new Claim("EmpId", user.EmpId),
            new Claim("EmpName", user.EmpName),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("Department", user.Department)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.SecretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(_settings.ExpiryHours),
            signingCredentials: creds);

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return ApiResponse<LoginResult>.Ok(new LoginResult(tokenString, user.EmpId, user.EmpName, user.Role, user.Department));
    }
}
