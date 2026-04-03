using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.HODApproval.Approve;

public record HODApproveCommand(int RequestId, string? Comments) : IRequest<ApiResponse<bool>>;
