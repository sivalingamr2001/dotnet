using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RBAC.Api.Common.Responses;
using RBAC.Api.Infrastructure.Persistence;

namespace RBAC.Api.Features.AccessRequest.GetAccessRequestById;

public class GetAccessRequestByIdHandler : IRequestHandler<GetAccessRequestByIdQuery, ApiResponse<Domain.Entities.AccessRequest>>
{
    private readonly AppDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GetAccessRequestByIdHandler(AppDbContext db, IHttpContextAccessor httpContextAccessor)
    {
        _db = db;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse<Domain.Entities.AccessRequest>> Handle(GetAccessRequestByIdQuery request, CancellationToken cancellationToken)
    {
        var empId = _httpContextAccessor.HttpContext?.User?.FindFirst("EmpId")?.Value;
        if (string.IsNullOrWhiteSpace(empId)) return ApiResponse<Domain.Entities.AccessRequest>.Fail("Unauthorized");

        var entity = await _db.AccessRequests.Include(r => r.AccessDetails).FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);
        if (entity == null) return ApiResponse<Domain.Entities.AccessRequest>.Fail("Not found");
        if (entity.EmpId != empId && !_httpContextAccessor.HttpContext!.User.IsInRole("HOD") && !_httpContextAccessor.HttpContext!.User.IsInRole("IT"))
            return ApiResponse<Domain.Entities.AccessRequest>.Fail("Forbidden");

        return ApiResponse<Domain.Entities.AccessRequest>.Ok(entity);
    }
}
