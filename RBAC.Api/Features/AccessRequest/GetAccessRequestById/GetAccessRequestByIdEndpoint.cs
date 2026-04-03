using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace RBAC.Api.Features.AccessRequest.GetAccessRequestById;

public class GetAccessRequestByIdEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/access-requests/{id:int}", async (int id, IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAccessRequestByIdQuery(id));
            if (!result.Success) return Results.NotFound(result);
            return Results.Ok(result);
        }).RequireAuthorization();
    }
}
