using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.AuditLog.GetAuditLogs;

public record GetAuditLogsQuery(string? ActionFilter, int Page, int PageSize) : IRequest<ApiResponse<PagedResponse<Domain.Entities.AuditLog>>>;
