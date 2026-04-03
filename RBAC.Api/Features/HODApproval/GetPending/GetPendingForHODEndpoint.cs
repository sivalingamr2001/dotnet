using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace RBAC.Api.Features.HODApproval.GetPending;

public class GetPendingForHODEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/hod/pending", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetPendingForHODQuery());
            return result.Success ? Results.Ok(result) : Results.Unauthorized();
        }).RequireAuthorization("HOD");
    }
}
