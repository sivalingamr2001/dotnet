namespace RBAC.Api.Domain.Entities;

public class EmpMast
{
    public string EmpId { get; set; } = null!;
    public string EmpName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string Designation { get; set; } = null!;
    public string Role { get; set; } = null!;
    public bool IsActive { get; set; }
}
