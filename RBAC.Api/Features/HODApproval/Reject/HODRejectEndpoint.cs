using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RBAC.Api.Features.HODApproval.Reject;

public class HODRejectEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/hod/reject/{requestId:int}", async (int requestId, [FromBody] HODRejectCommand command, IMediator mediator) =>
        {
            if (requestId != command.RequestId) return Results.BadRequest();
            var result = await mediator.Send(command);
            return result.Success ? Results.Ok(result) : Results.BadRequest(result);
        }).RequireAuthorization("HOD");
    }
}
