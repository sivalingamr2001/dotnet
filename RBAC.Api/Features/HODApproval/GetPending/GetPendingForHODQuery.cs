using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.HODApproval.GetPending;

public record GetPendingForHODQuery : IRequest<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>;
