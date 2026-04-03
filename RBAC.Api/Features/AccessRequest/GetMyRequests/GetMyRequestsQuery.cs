using MediatR;
using RBAC.Api.Common.Responses;
using DomainAccessRequest = RBAC.Api.Domain.Entities.AccessRequest;

namespace RBAC.Api.Features.AccessRequest.GetMyRequests;

public record GetMyRequestsQuery : IRequest<ApiResponse<IEnumerable<DomainAccessRequest>>>;
