using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.Dashboard;

public record GetRequesterDashboardQuery : IRequest<ApiResponse<object>>;
public record GetHODDashboardQuery : IRequest<ApiResponse<object>>;
public record GetITDashboardQuery : IRequest<ApiResponse<object>>;
