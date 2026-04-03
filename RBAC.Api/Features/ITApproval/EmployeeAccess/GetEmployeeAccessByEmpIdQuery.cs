using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.ITApproval.EmployeeAccess;

public record GetEmployeeAccessByEmpIdQuery(string EmpId) : IRequest<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>;
