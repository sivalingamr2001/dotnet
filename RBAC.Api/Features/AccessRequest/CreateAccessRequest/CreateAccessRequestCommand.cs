using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.AccessRequest.CreateAccessRequest;

public record CreateAccessRequestCommand(string FolderNamePath, string TypeOfAccess, string ReasonForAccess, bool IsAgreed) : IRequest<ApiResponse<int>>;
