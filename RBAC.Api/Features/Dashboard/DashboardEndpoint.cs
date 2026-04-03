using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace RBAC.Api.Features.Dashboard;

public class DashboardEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/dashboard/requester", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetRequesterDashboardQuery());
            return result.Success ? Results.Ok(result) : Results.Unauthorized();
        }).RequireAuthorization("Requester");

        app.MapGet("/api/dashboard/hod", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetHODDashboardQuery());
            return result.Success ? Results.Ok(result) : Results.Unauthorized();
        }).RequireAuthorization("HOD");

        app.MapGet("/api/dashboard/it", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetITDashboardQuery());
            return result.Success ? Results.Ok(result) : Results.Unauthorized();
        }).RequireAuthorization("IT");
    }
}
