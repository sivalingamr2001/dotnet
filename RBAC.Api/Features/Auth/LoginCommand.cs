using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.Auth;

public record LoginCommand(string UsernameOrEmail, string Password) : IRequest<ApiResponse<LoginResult>>;
