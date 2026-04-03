using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace RBAC.Api.Features.ITApproval.Queue;

public class GetITPendingQueueEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/it/queue", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetITPendingQueueQuery());
            return result.Success ? Results.Ok(result) : Results.Unauthorized();
        }).RequireAuthorization("IT");
    }
}
