using MediatR;
using Microsoft.EntityFrameworkCore;
using RBAC.Api.Common.Responses;
using RBAC.Api.Domain.Enums;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.AuditLog.GetAuditLogs;

public class GetAuditLogsHandler : IRequestHandler<GetAuditLogsQuery, ApiResponse<PagedResponse<Domain.Entities.AuditLog>>>
{
    private readonly AppDbContext _db;

    public GetAuditLogsHandler(AppDbContext db) => _db = db;

    public async Task<ApiResponse<PagedResponse<Domain.Entities.AuditLog>>> Handle(GetAuditLogsQuery request, CancellationToken cancellationToken)
    {
        var query = _db.AuditLogs.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.ActionFilter) && Enum.TryParse<AuditAction>(request.ActionFilter, true, out var action))
        {
            query = query.Where(x => x.Action == action);
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query.OrderByDescending(x => x.Timestamp)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        return ApiResponse<PagedResponse<Domain.Entities.AuditLog>>.Ok(new PagedResponse<Domain.Entities.AuditLog>
        {
            Items = items,
            Page = request.Page,
            PageSize = request.PageSize,
            TotalCount = total
        });
    }
}
