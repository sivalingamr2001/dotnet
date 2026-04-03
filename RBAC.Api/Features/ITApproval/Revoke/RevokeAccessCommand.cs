using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.ITApproval.Revoke;

public record RevokeAccessCommand(int RequestId, string Reason) : IRequest<ApiResponse<bool>>;
