using System.Security.Claims;

namespace RBAC.Api.Common.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string? GetEmpId(this ClaimsPrincipal user) => user.FindFirstValue("EmpId");
    public static string? GetRole(this ClaimsPrincipal user) => user.FindFirstValue(ClaimTypes.Role);
    public static string? GetDepartment(this ClaimsPrincipal user) => user.FindFirstValue("Department");
    public static bool IsHOD(this ClaimsPrincipal user) => string.Equals(user.GetRole(), "HOD", StringComparison.OrdinalIgnoreCase);
    public static bool IsIT(this ClaimsPrincipal user) => string.Equals(user.GetRole(), "IT", StringComparison.OrdinalIgnoreCase);
    public static bool IsRequester(this ClaimsPrincipal user) => string.Equals(user.GetRole(), "Requester", StringComparison.OrdinalIgnoreCase);
}
