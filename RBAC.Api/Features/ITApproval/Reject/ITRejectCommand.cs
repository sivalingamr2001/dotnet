using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.ITApproval.Reject;

public record ITRejectCommand(int RequestId, string Reason) : IRequest<ApiResponse<bool>>;
