using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.ITApproval.Queue;

public record GetITPendingQueueQuery : IRequest<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>;
