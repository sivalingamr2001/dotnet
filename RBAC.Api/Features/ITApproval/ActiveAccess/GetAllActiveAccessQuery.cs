using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.ITApproval.ActiveAccess;

public record GetAllActiveAccessQuery : IRequest<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>;
