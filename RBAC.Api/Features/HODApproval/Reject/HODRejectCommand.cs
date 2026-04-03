using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.HODApproval.Reject;

public record HODRejectCommand(int RequestId, string Reason) : IRequest<ApiResponse<bool>>;
