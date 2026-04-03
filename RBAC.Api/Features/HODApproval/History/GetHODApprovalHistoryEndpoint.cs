using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace RBAC.Api.Features.HODApproval.History;

public class GetHODApprovalHistoryEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/hod/history", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetHODApprovalHistoryQuery());
            return result.Success ? Results.Ok(result) : Results.Unauthorized();
        }).RequireAuthorization("HOD");
    }
}
