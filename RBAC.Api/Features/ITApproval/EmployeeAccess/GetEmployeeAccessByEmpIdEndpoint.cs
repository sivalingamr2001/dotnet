using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace RBAC.Api.Features.ITApproval.EmployeeAccess;

public class GetEmployeeAccessByEmpIdEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/it/employee-access/{empId}", async (string empId, IMediator mediator) =>
        {
            var result = await mediator.Send(new GetEmployeeAccessByEmpIdQuery(empId));
            return result.Success ? Results.Ok(result) : Results.NotFound(result);
        }).RequireAuthorization("IT");
    }
}
