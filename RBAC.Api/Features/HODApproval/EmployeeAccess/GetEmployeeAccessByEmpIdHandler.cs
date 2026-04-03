using MediatR;
using Microsoft.EntityFrameworkCore;
using RBAC.Api.Common.Responses;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.HODApproval.EmployeeAccess;

public class GetEmployeeAccessByEmpIdHandler : IRequestHandler<GetEmployeeAccessByEmpIdQuery, ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>>
{
    private readonly AppDbContext _db;

    public GetEmployeeAccessByEmpIdHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>> Handle(GetEmployeeAccessByEmpIdQuery request, CancellationToken cancellationToken)
    {
        var items = await _db.AccessRequests.Include(x => x.AccessDetails).Where(x => x.EmpId == request.EmpId).ToListAsync(cancellationToken);
        return ApiResponse<IEnumerable<Domain.Entities.AccessRequest>>.Ok(items);
    }
}
