using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace RBAC.Api.Features.ITApproval.ActiveAccess;

public class GetAllActiveAccessEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/it/active-access", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAllActiveAccessQuery());
            return result.Success ? Results.Ok(result) : Results.Unauthorized();
        }).RequireAuthorization("IT");
    }
}
