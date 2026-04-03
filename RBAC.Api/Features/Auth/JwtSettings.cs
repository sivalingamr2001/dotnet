namespace RBAC.Api.Features.Auth;

public class JwtSettings
{
    public string Issuer { get; set; } = "RBACApi";
    public string Audience { get; set; } = "RBACApiUsers";
    public string SecretKey { get; set; } = "SuperSecretLongKeyForDevelopmentOnly123!";
    public int ExpiryHours { get; set; } = 8;
}
