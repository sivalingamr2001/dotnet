using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.Auth;

public class LoginEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", async ([FromBody] LoginCommand command, IMediator mediator) =>
        {
            var result = await mediator.Send(command);
            if (!result.Success) return Results.Unauthorized();
            return Results.Ok(result);
        }).AllowAnonymous();
    }
}
