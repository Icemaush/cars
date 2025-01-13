namespace cars.Server.SearchFilters
{
    public abstract class BaseQueryObject
    {
        public abstract void ApplyFilter<T>(List<T> data);
    }
}
