using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.AccessRequest.CreateAccessRequest;

public class CreateAccessRequestEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/access-requests", async ([FromBody] CreateAccessRequestCommand command, IMediator mediator) =>
        {
            var result = await mediator.Send(command);
            if (!result.Success) return Results.BadRequest(result);
            return Results.Ok(result);
        }).RequireAuthorization("Requester");
    }
}
