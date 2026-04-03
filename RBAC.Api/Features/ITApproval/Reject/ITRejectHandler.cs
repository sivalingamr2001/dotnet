using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RBAC.Api.Common.Responses;
using RBAC.Api.Domain.Entities;
using RBAC.Api.Domain.Enums;
using RBAC.Api.Infrastructure.Persistence;
using AuditLogEntity = RBAC.Api.Domain.Entities.AuditLog;

namespace RBAC.Api.Features.ITApproval.Reject;

public class ITRejectHandler : IRequestHandler<ITRejectCommand, ApiResponse<bool>>
{
    private readonly AppDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ITRejectHandler(AppDbContext db, IHttpContextAccessor httpContextAccessor)
    {
        _db = db;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse<bool>> Handle(ITRejectCommand request, CancellationToken cancellationToken)
    {
        var empId = _httpContextAccessor.HttpContext?.User?.FindFirst("EmpId")?.Value;
        if (string.IsNullOrWhiteSpace(empId)) return ApiResponse<bool>.Fail("Unauthorized");

        var accessRequest = await _db.AccessRequests.Include(x => x.AccessDetails).FirstOrDefaultAsync(x => x.Id == request.RequestId, cancellationToken);
        if (accessRequest == null) return ApiResponse<bool>.Fail("Not found");
        if (accessRequest.Status != AccessStatus.PendingIT) return ApiResponse<bool>.Fail("Invalid status");

        accessRequest.Status = AccessStatus.Rejected;
        accessRequest.ModifiedOn = DateTime.UtcNow;
        accessRequest.ModifiedBy = empId;

        _db.AccessApprovals.Add(new AccessApproval
        {
            AccessRequestId = accessRequest.Id,
            EmpId = empId,
            TypeOfAccessApproval = ApprovalType.IT,
            Comments = request.Reason,
            CreatedOn = DateTime.UtcNow,
            CreatedBy = empId
        });

        _db.AuditLogs.Add(new AuditLogEntity
        {
            Timestamp = DateTime.UtcNow,
            Actor = empId,
            Action = AuditAction.ITRejected,
            ResourceId = accessRequest.Id,
            Resource = accessRequest.AccessDetails?.FolderNamePath ?? string.Empty,
            Details = request.Reason
        });

        await _db.SaveChangesAsync(cancellationToken);
        return ApiResponse<bool>.Ok(true);
    }
}
