using MediatR;
using Microsoft.EntityFrameworkCore;
using RBAC.Api.Common.Responses;
using RBAC.Api.Domain.Enums;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.ITApproval.ActiveAccess;

public class GetAllActiveAccessHandler : IRequestHandler<GetAllActiveAccessQuery, ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>
{
    private readonly AppDbContext _db;

    public GetAllActiveAccessHandler(AppDbContext db) => _db = db;

    public async Task<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>> Handle(GetAllActiveAccessQuery request, CancellationToken cancellationToken)
    {
        var items = await _db.AccessRequests.Include(r => r.AccessDetails).Where(r => r.Status == AccessStatus.Approved).ToListAsync(cancellationToken);
        return ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>.Ok(items);
    }
}
