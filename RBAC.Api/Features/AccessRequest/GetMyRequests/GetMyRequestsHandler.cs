using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RBAC.Api.Common.Responses;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.AccessRequest.GetMyRequests;

public class GetMyRequestsHandler : IRequestHandler<GetMyRequestsQuery, ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>
{
    private readonly AppDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GetMyRequestsHandler(AppDbContext db, IHttpContextAccessor httpContextAccessor)
    {
        _db = db;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>> Handle(GetMyRequestsQuery request, CancellationToken cancellationToken)
    {
        var empId = _httpContextAccessor.HttpContext?.User?.FindFirst("EmpId")?.Value;
        if (string.IsNullOrWhiteSpace(empId)) return ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>.Fail("Unauthorized");

        var items = await _db.AccessRequests
            .Include(r => r.AccessDetails)
            .Where(r => r.EmpId == empId)
            .ToListAsync(cancellationToken);

        return ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>.Ok(items);
    }
}
