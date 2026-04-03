using Microsoft.EntityFrameworkCore;
using RBAC.Api.Domain.Entities;
using RBAC.Api.Domain.Enums;
using RBAC.Api.Infrastructure.Persistence;
using AuditLogEntity = RBAC.Api.Domain.Entities.AuditLog;

namespace RBAC.Api.Infrastructure.BackgroundServices;

public class AccessExpiryBackgroundService : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly ILogger<AccessExpiryBackgroundService> _logger;

    public AccessExpiryBackgroundService(IServiceProvider services, ILogger<AccessExpiryBackgroundService> logger)
    {
        _services = services;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
                await ProcessExpiryAsync(stoppingToken);
            }
            catch (TaskCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AccessExpiryBackgroundService");
            }
        }
    }

    private async Task ProcessExpiryAsync(CancellationToken cancellationToken)
    {
        using var scope = _services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        var expiredRequests = await db.AccessRequests
            .Include(r => r.AccessDetails)
            .Where(r => r.Status == AccessStatus.Approved && r.AccessDetails!.ExpiredAt <= DateTime.UtcNow)
            .ToListAsync(cancellationToken);

        foreach (var request in expiredRequests)
        {
            request.Status = AccessStatus.Expired;
            request.ModifiedOn = DateTime.UtcNow;

            db.AuditLogs.Add(new AuditLogEntity
            {
                Timestamp = DateTime.UtcNow,
                Actor = request.CreatedBy,
                Action = AuditAction.Expired,
                ResourceId = request.Id,
                Resource = request.AccessDetails?.FolderNamePath ?? string.Empty,
                Details = "Auto-expired by background service"
            });
        }

        await db.SaveChangesAsync(cancellationToken);

        if (expiredRequests.Any())
        {
            _logger.LogInformation("Expired {Count} access requests", expiredRequests.Count);
        }
    }
}
