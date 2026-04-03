using MediatR;
using RBAC.Api.Common.Responses;

namespace RBAC.Api.Features.HODApproval.EmployeeAccess;

public record GetEmployeeAccessByEmpIdQuery(string EmpId) : IRequest<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>;
