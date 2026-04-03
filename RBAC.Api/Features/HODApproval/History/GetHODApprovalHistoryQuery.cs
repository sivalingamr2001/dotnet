using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.HODApproval.History;

public record GetHODApprovalHistoryQuery : IRequest<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>;
