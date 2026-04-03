using FluentValidation;

namespace RBAC.Api.Features.AccessRequest.CreateAccessRequest;

public class CreateAccessRequestValidator : AbstractValidator<CreateAccessRequestCommand>
{
    public CreateAccessRequestValidator()
    {
        RuleFor(x => x.FolderNamePath).NotEmpty();
        RuleFor(x => x.TypeOfAccess).NotEmpty().Must(x => x == "Read" || x == "Read-Write");
        RuleFor(x => x.ReasonForAccess).NotEmpty();
    }
}
