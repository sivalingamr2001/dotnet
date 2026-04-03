using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RBAC.Api.Common.Responses;
using RBAC.Api.Domain.Enums;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.Dashboard;

public class DashboardHandlers : 
    IRequestHandler<GetRequesterDashboardQuery, ApiResponse<object>>,
    IRequestHandler<GetHODDashboardQuery, ApiResponse<object>>,
    IRequestHandler<GetITDashboardQuery, ApiResponse<object>>
{
    private readonly AppDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public DashboardHandlers(AppDbContext db, IHttpContextAccessor httpContextAccessor)
    {
        _db = db;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse<object>> Handle(GetRequesterDashboardQuery request, CancellationToken cancellationToken)
    {
        var empId = _httpContextAccessor.HttpContext?.User?.FindFirst("EmpId")?.Value;
        if (string.IsNullOrWhiteSpace(empId)) return ApiResponse<object>.Fail("Unauthorized");

        var total = await _db.AccessRequests.CountAsync(r => r.EmpId == empId, cancellationToken);
        var approved = await _db.AccessRequests.CountAsync(r => r.EmpId == empId && r.Status == AccessStatus.Approved, cancellationToken);
        var pending = await _db.AccessRequests.CountAsync(r => r.EmpId == empId && r.Status == AccessStatus.PendingHOD, cancellationToken);

        return ApiResponse<object>.Ok(new { TotalRequests = total, Approved = approved, Pending = pending });
    }

    public async Task<ApiResponse<object>> Handle(GetHODDashboardQuery request, CancellationToken cancellationToken)
    {
        var department = _httpContextAccessor.HttpContext?.User?.FindFirst("Department")?.Value;
        if (string.IsNullOrWhiteSpace(department)) return ApiResponse<object>.Fail("Unauthorized");

        var total = await _db.AccessRequests.Include(r => r.Employee).CountAsync(r => r.Employee != null && r.Employee.Department == department, cancellationToken);
        var pending = await _db.AccessRequests.Include(r => r.Employee).CountAsync(r => r.Status == AccessStatus.PendingHOD && r.Employee != null && r.Employee.Department == department, cancellationToken);

        return ApiResponse<object>.Ok(new { TotalRequests = total, PendingHOD = pending });
    }

    public async Task<ApiResponse<object>> Handle(GetITDashboardQuery request, CancellationToken cancellationToken)
    {
        var total = await _db.AccessRequests.CountAsync(cancellationToken);
        var pending = await _db.AccessRequests.CountAsync(r => r.Status == AccessStatus.PendingIT, cancellationToken);
        var expiringSoon = await _db.AccessRequests.Include(r => r.AccessDetails).CountAsync(r => r.Status == AccessStatus.Approved && r.AccessDetails != null && r.AccessDetails.ExpiredAt != null && r.AccessDetails.ExpiredAt <= DateTime.UtcNow.AddDays(30), cancellationToken);

        return ApiResponse<object>.Ok(new { TotalRequests = total, PendingIT = pending, ExpiringSoon = expiringSoon });
    }
}
