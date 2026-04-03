using Microsoft.EntityFrameworkCore;
using RBAC.Api.Domain.Entities;

namespace RBAC.Api.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<EmpMast> EmpMast { get; set; } = null!;
    public DbSet<AccessDetails> AccessDetails { get; set; } = null!;
    public DbSet<AccessRequest> AccessRequests { get; set; } = null!;
    public DbSet<AccessApproval> AccessApprovals { get; set; } = null!;
    public DbSet<AuditLog> AuditLogs { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EmpMast>().HasKey(e => e.EmpId);
        modelBuilder.Entity<EmpMast>().ToTable("Jan_Emp_Mast_V");
        modelBuilder.Entity<EmpMast>().Property(e => e.EmpId).ValueGeneratedNever();

        modelBuilder.Entity<AccessDetails>().ToTable("Jan_Access_Details");
        modelBuilder.Entity<AccessRequest>().ToTable("Jan_Access_Request");
        modelBuilder.Entity<AccessApproval>().ToTable("Jan_Access_Approval");
        modelBuilder.Entity<AuditLog>().ToTable("Jan_Audit_Log");

        modelBuilder.Entity<AccessRequest>()
            .HasOne(r => r.AccessDetails)
            .WithMany(d => d.AccessRequests)
            .HasForeignKey(r => r.AccessDetailsId)
            .OnDelete(DeleteBehavior.Cascade);

        base.OnModelCreating(modelBuilder); 

        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        var employees = new[]
        {
            new EmpMast { EmpId = "EMP001", EmpName = "Requester One", Email = "req1@example.com", Username = "req1", PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"), Department = "R&D", Designation = "Developer", Role = "Requester", IsActive = true },
            new EmpMast { EmpId = "EMP002", EmpName = "HOD One", Email = "hod1@example.com", Username = "hod1", PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"), Department = "R&D", Designation = "HOD", Role = "HOD", IsActive = true },
            new EmpMast { EmpId = "EMP003", EmpName = "IT One", Email = "it1@example.com", Username = "it1", PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"), Department = "IT", Designation = "IT Admin", Role = "IT", IsActive = true }
        };
        modelBuilder.Entity<EmpMast>().HasData(employees);
    }
}
