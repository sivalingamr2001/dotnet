using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace RBAC.Api.Features.AccessRequest.GetMyRequests;

public class GetMyRequestsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/access-requests/my", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetMyRequestsQuery());
            return result.Success ? Results.Ok(result) : Results.Unauthorized();
        }).RequireAuthorization("Requester");
    }
}
