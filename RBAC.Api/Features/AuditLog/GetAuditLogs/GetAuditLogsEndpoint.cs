using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace RBAC.Api.Features.AuditLog.GetAuditLogs;

public class GetAuditLogsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/audit-logs", async (string? actionType, int page, int pageSize, IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAuditLogsQuery(actionType, page <= 0 ? 1 : page, pageSize <= 0 ? 10 : pageSize));
            return result.Success ? Results.Ok(result) : Results.BadRequest(result);
        }).RequireAuthorization("IT");
    }
}
