using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RBAC.Api.Features.ITApproval.Approve;

public class ITApproveEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/it/approve/{requestId:int}", async (int requestId, [FromBody] ITApproveCommand command, IMediator mediator) =>
        {
            if (requestId != command.RequestId) return Results.BadRequest();
            var result = await mediator.Send(command);
            return result.Success ? Results.Ok(result) : Results.BadRequest(result);
        }).RequireAuthorization("IT");
    }
}
