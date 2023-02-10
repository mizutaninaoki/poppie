import pytest
from app.models.company import Company
from pdb import set_trace as st


@pytest.fixture(scope="function", autouse=True)
def init_company_test(company_factory):
    company_factory.create(point=1000)


# class TestCompany:
#     @pytest.mark.django_db
#     def test_decrease_point(self):
#         company = Company.objects.first()

#         company.decrease_point(100)
#         assert company.point == 900


@pytest.mark.django_db
@pytest.mark.parametrize("test_input, expected", [(100, 900), (1000, 0)])
def test_decrease_point(test_input, expected):
    company = Company.objects.first()

    company.decrease_point(test_input)
    assert company.point == expected
