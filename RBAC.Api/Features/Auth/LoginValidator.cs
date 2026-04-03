using FluentValidation;

namespace RBAC.Api.Features.Auth;

public class LoginValidator : AbstractValidator<LoginCommand>
{
    public LoginValidator()
    {
        RuleFor(x => x.UsernameOrEmail).NotEmpty().WithMessage("Username or email is required");
        RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required");
    }
}
