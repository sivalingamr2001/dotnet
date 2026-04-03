using MediatR;
using Microsoft.Extensions.Logging;
using RBAC.Api.Common.Responses;
using DomainAccessRequest = RBAC.Api.Domain.Entities.AccessRequest;
using AccessDetails = RBAC.Api.Domain.Entities.AccessDetails;
using AuditLogEntity = RBAC.Api.Domain.Entities.AuditLog;
using RBAC.Api.Domain.Enums;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.AccessRequest.CreateAccessRequest;

public class CreateAccessRequestHandler : IRequestHandler<CreateAccessRequestCommand, ApiResponse<int>>
{
    private readonly AppDbContext _db;
    private readonly ILogger<CreateAccessRequestHandler> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CreateAccessRequestHandler(AppDbContext db, ILogger<CreateAccessRequestHandler> logger, IHttpContextAccessor httpContextAccessor)
    {
        _db = db;
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse<int>> Handle(CreateAccessRequestCommand request, CancellationToken cancellationToken)
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var empId = user?.FindFirst("EmpId")?.Value;
        if (string.IsNullOrWhiteSpace(empId))
            return ApiResponse<int>.Fail("Unauthorized");

        var details = new AccessDetails
        {
            FolderNamePath = request.FolderNamePath,
            TypeOfAccess = request.TypeOfAccess,
            ReasonForAccess = request.ReasonForAccess,
            CreatedOn = DateTime.UtcNow,
            CreatedBy = empId,
            ExpiredAt = null
        };

        _db.AccessDetails.Add(details);
        await _db.SaveChangesAsync(cancellationToken);

        var accessRequest = new DomainAccessRequest
        {
            EmpId = empId,
            AccessDetailsId = details.Id,
            Status = AccessStatus.PendingHOD,
            CreatedOn = DateTime.UtcNow,
            CreatedBy = empId,
            IsAgreed = request.IsAgreed,
            IsRevoke = false
        };

        _db.AccessRequests.Add(accessRequest);
        _db.AuditLogs.Add(new AuditLogEntity
        {
            Timestamp = DateTime.UtcNow,
            Actor = empId,
            Action = AuditAction.RequestCreated,
            ResourceId = accessRequest.Id,
            Resource = details.FolderNamePath,
            Details = "Access request created"
        });

        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Access request {RequestId} created by {EmpId}", accessRequest.Id, empId);
        return ApiResponse<int>.Ok(accessRequest.Id);
    }
}
