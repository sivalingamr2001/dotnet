namespace RBAC.Api.Features.Auth;

public record LoginResult(string Token, string EmpId, string EmpName, string Role, string Department);
