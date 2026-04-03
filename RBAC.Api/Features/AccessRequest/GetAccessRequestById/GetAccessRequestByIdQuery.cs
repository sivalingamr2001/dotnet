using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.AccessRequest.GetAccessRequestById;

public record GetAccessRequestByIdQuery(int Id) : IRequest<ApiResponse<Domain.Entities.AccessRequest>>;
