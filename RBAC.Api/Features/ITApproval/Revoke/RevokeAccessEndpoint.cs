using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RBAC.Api.Features.ITApproval.Revoke;

public class RevokeAccessEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/it/revoke/{requestId:int}", async (int requestId, [FromBody] RevokeAccessCommand command, IMediator mediator) =>
        {
            if (requestId != command.RequestId) return Results.BadRequest();
            var result = await mediator.Send(command);
            return result.Success ? Results.Ok(result) : Results.BadRequest(result);
        }).RequireAuthorization("IT");
    }
}
