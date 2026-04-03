using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RBAC.Api.Features.HODApproval.Approve;

public class HODApproveEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/hod/approve/{requestId:int}", async (int requestId, [FromBody] HODApproveCommand command, IMediator mediator) =>
        {
            if (requestId != command.RequestId) return Results.BadRequest();
            var result = await mediator.Send(command);
            return result.Success ? Results.Ok(result) : Results.BadRequest(result);
        }).RequireAuthorization("HOD");
    }
}
