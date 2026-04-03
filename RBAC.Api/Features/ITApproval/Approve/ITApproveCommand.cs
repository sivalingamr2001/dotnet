using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.ITApproval.Approve;

public record ITApproveCommand(int RequestId, string ITSRNumber) : IRequest<ApiResponse<bool>>;
