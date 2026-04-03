using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RBAC.Api.Features.ITApproval.Reject;

public class ITRejectEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/it/reject/{requestId:int}", async (int requestId, [FromBody] ITRejectCommand command, IMediator mediator) =>
        {
            if (requestId != command.RequestId) return Results.BadRequest();
            var result = await mediator.Send(command);
            return result.Success ? Results.Ok(result) : Results.BadRequest(result);
        }).RequireAuthorization("IT");
    }
}
