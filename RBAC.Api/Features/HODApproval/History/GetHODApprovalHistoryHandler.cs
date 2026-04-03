using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RBAC.Api.Common.Responses;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.HODApproval.History;

public class GetHODApprovalHistoryHandler : IRequestHandler<GetHODApprovalHistoryQuery, ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>
{
    private readonly AppDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GetHODApprovalHistoryHandler(AppDbContext db, IHttpContextAccessor httpContextAccessor)
    {
        _db = db;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>> Handle(GetHODApprovalHistoryQuery request, CancellationToken cancellationToken)
    {
        var department = _httpContextAccessor.HttpContext?.User?.FindFirst("Department")?.Value;
        if (string.IsNullOrWhiteSpace(department)) return ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>.Fail("Unauthorized");

        var items = await _db.AccessRequests
            .Include(x => x.AccessDetails)
            .Include(x => x.Employee)
            .Where(x => x.Employee != null && x.Employee.Department == department && (x.Status != Domain.Enums.AccessStatus.PendingHOD))
            .ToListAsync(cancellationToken);

        return ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>.Ok(items);
    }
}
