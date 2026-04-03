using MediatR;
using Microsoft.EntityFrameworkCore;
using RBAC.Api.Common.Responses;
using RBAC.Api.Domain.Enums;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.ITApproval.Queue;

public class GetITPendingQueueHandler : IRequestHandler<GetITPendingQueueQuery, ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>
{
    private readonly AppDbContext _db;

    public GetITPendingQueueHandler(AppDbContext db) => _db = db;

    public async Task<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>> Handle(GetITPendingQueueQuery request, CancellationToken cancellationToken)
    {
        var items = await _db.AccessRequests.Include(r => r.AccessDetails).Where(r => r.Status == AccessStatus.PendingIT).ToListAsync(cancellationToken);
        return ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>.Ok(items);
    }
}
